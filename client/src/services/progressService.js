import {
  createUserData,
  getUserData
} from "./storage";

export const progressService = {
  async list() {
    return getUserData("progress");
  },

  async create(payload) {
    return createUserData("progress", {
      ...payload,
      weight: Number(payload.weight || 0),
      bodyFat: Number(payload.bodyFat || 0),
      steps: Number(payload.steps || 0),
      calories: Number(payload.calories || 0),
      activeMinutes: Number(payload.activeMinutes || 0),
      workouts: Number(payload.workouts || 0)
    });
  }
};