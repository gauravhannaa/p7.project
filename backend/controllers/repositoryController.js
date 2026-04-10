import Repository from '../models/Repository.js';

export const getRepositories = async (req, res) => {
  try {
    const repos = await Repository.find().sort({ updated: -1 });
    res.json(repos);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const createRepository = async (req, res) => {
  try {
    const repo = await Repository.create(req.body);
    res.status(201).json(repo);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

export const updateRepository = async (req, res) => {
  try {
    const repo = await Repository.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!repo) return res.status(404).json({ message: 'Not found' });
    res.json(repo);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

export const deleteRepository = async (req, res) => {
  try {
    const repo = await Repository.findByIdAndDelete(req.params.id);
    if (!repo) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};