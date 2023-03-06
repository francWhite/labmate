import express from 'express';
import { ServiceInstance } from './serviceInstance';
import { Status } from './status';
import { ObjectId } from 'mongodb';

export const servicesRouter = express.Router();
servicesRouter.use(express.json());

servicesRouter.get('/', async (req, res) => {
  res.json(SERVICES);
});

servicesRouter.get('/:id', async (req, res) => {
  const service = SERVICES.find(service => service._id?.equals(req.params.id));
  if (!service) {
    res.status(404).send('Service not found');
  } else {
    res.json(service);
  }
});

servicesRouter.post('/', async (req, res) => {
  const service = req.body as ServiceInstance;
  service._id = req.body._id ? new ObjectId(req.body._id) : new ObjectId();
  SERVICES.push(service);
  res.json(service);
});

servicesRouter.put('/:id', async (req, res) => {
  const service = req.body as ServiceInstance;
  service._id = req.body._id ? new ObjectId(req.body._id) : new ObjectId();
  const index = SERVICES.findIndex(service => service._id?.equals(req.params.id));
  if (index === -1) {
    res.status(404).send('Service not found');
  } else {
    SERVICES[index] = service;
    res.json(service);
  }
});

servicesRouter.delete('/:id', async (req, res) => {
  const index = SERVICES.findIndex(service => service._id?.equals(req.params.id));
  if (index === -1) {
    res.status(404).send('Service not found');
  } else {
    SERVICES.splice(index, 1);
    res.status(204).send();
  }
});

const SERVICES: ServiceInstance[] = [
  {
    _id: new ObjectId(),
    name: 'Plex',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnf02hHy_OH3A-yFuRGkAVm6vtaiDzax1Ntw&usqp=CAU',
    version: '1.23.4',
    status: Status.Inactive,
    url: 'https://google.com?search?q=plex',
  },
  {
    _id: new ObjectId(),
    name: 'Sonarr',
    icon: 'https://forums-sonarr-tv.s3.dualstack.us-east-1.amazonaws.com/original/2X/e/ef4553fe96f04a298ec502279731579698e96a9b.png',
    version: '1.55',
    status: Status.Alive,
    url: 'https://google.com?search?q=sonarr',
  },
  {
    _id: new ObjectId(),
    name: 'Radarr',
    icon: 'https://styles.redditmedia.com/t5_3icg7/styles/communityIcon_d0kaqkdtx9261.png',
    version: '7.2.15',
    status: Status.Dead,
    url: 'https://google.com?search?q=radarr',
  },
  {
    _id: new ObjectId(),
    name: 'PiHole',
    icon: 'https://wp-cdn.pi-hole.net/wp-content/uploads/2016/12/Vortex-R.png',
    version: '1.1.20',
    status: Status.Alive,
    url: 'https://google.com?search?q=pihole',
  },
  {
    _id: new ObjectId(),
    name: 'JDownloader very very very very long text',
    version: '2',
    status: Status.Alive,
    url: 'https://google.com?search?q=jdownloader',
  },
];
