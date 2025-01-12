import { Router } from 'express';
import PickingSlipController from '../controller/PickingSlipController';

const router = Router();

const pickingSlipController = new PickingSlipController();

router.get('/', async (req, res) => await pickingSlipController.getPickingSlip(req, res));

export default router;