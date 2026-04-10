import Certification from '../models/Certification.js';

export const getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ date: -1 });
    res.json(certs);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const createCertification = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json(cert);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

export const updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return res.status(404).json({ message: 'Not found' });
    res.json(cert);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

export const deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};