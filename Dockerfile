FROM node:18-alpine AS build-client

WORKDIR /app
COPY packages/client/package.json packages/client/package-lock.json ./

RUN npm install
COPY packages/client/. .

RUN npm run build --omit=dev

FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build-backend
WORKDIR /source

# copy csproj and restore as distinct layers
COPY packages/backend/*.sln .
COPY packages/backend/Labmate.WebApi/*.csproj ./Labmate.WebApi/
COPY packages/backend/Labmate.Persistence/*.csproj ./Labmate.Persistence/
RUN dotnet restore

# copy everything else and build app
COPY packages/backend/. ./
WORKDIR /source/Labmate.WebApi/
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine
WORKDIR /app
COPY --from=build-backend /app ./
COPY --from=build-client /app/dist ./wwwroot

ENTRYPOINT ["dotnet", "Labmate.WebApi.dll"]