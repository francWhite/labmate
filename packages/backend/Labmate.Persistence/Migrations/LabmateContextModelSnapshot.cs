﻿// <auto-generated />
using System;
using Labmate.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Labmate.Persistence.Migrations
{
    [DbContext(typeof(LabmateContext))]
    partial class LabmateContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("Labmate.Persistence.Model.Service", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("IconUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("StatusCheckConfigurationId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Version")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("StatusCheckConfigurationId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("Labmate.Persistence.Model.StatusCheckConfiguration", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("CheckUrl")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Enabled")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Interval")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("StatusCheckConfigurations", (string)null);
                });

            modelBuilder.Entity("Labmate.Persistence.Model.Service", b =>
                {
                    b.HasOne("Labmate.Persistence.Model.StatusCheckConfiguration", "StatusCheckConfiguration")
                        .WithMany()
                        .HasForeignKey("StatusCheckConfigurationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StatusCheckConfiguration");
                });
#pragma warning restore 612, 618
        }
    }
}
