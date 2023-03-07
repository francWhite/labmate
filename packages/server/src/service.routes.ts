import express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from './database';
import { updateStatusCheck } from './status-check';

export const servicesRouter = express.Router();
servicesRouter.use(express.json());

servicesRouter.get('/', async (req, res) => {
  try {
    const services = await collections.serviceInstances?.find({}).toArray();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error while retrieving services');
  }
});

servicesRouter.get('/:id', async (req, res) => {
  const id = req?.params?.id;
  try {
    const service = await collections.serviceInstances?.findOne({ _id: new ObjectId(id) });
    if (service) {
      res.json(service);
    } else {
      res.status(404).send(`Service with id ${id} not found`);
    }
  } catch (err) {
    console.error(err);
    res.status(404).send(`Service with id ${id} not found`);
  }
});

servicesRouter.post('/', async (req, res) => {
  try {
    const result = await collections.serviceInstances?.insertOne(req.body);
    if (result?.acknowledged) {
      updateStatusCheck(result.insertedId.toHexString());
      res.status(201).send(result.insertedId);
    } else {
      res.status(500).send('Error while creating service');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error while creating service');
  }
});

servicesRouter.put('/:id', async (req, res) => {
  const id = req?.params?.id;
  delete req.body['_id'];

  try {
    const result = await collections.serviceInstances?.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    if (result && result.matchedCount) {
      updateStatusCheck(id);
      res.status(200).send(`Updated service with id ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find service with id ${id}`);
    } else {
      res.status(304).send(`Failed to update service with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error while updating service');
  }
});

servicesRouter.delete('/:id', async (req, res) => {
  const id = req?.params?.id;
  try {
    const result = await collections.serviceInstances?.deleteOne({ _id: new ObjectId(id) });
    if (result && result.deletedCount) {
      updateStatusCheck(id);
      res.status(204).send(`Deleted service with id ${id}.`);
    } else if (!result) {
      res.status(400).send(`Failed to delete service with id ${id}`);
    } else {
      res.status(404).send(`Failed to find service with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});
