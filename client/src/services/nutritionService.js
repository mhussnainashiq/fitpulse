import {
  createUserData,
  getUserData,
  removeUserData,
  updateUserData
} from "./storage";

export const nutritionService = {
  async list() {
    return getUserData("nutrition");
  },

  async create(payload) {
    return createUserData("nutrition", {
      ...payload,
      calories: Number(payload.calories || 0),
      protein: Number(payload.protein || 0),
      carbs: Number(payload.carbs || 0),
      fats: Number(payload.fats || 0),
      fiber: Number(payload.fiber || 0),
      water: Number(payload.water || 0)
    });
  },

  async update(id, payload) {
    return updateUserData("nutrition", id, {
      ...payload,
      calories: Number(payload.calories || 0),
      protein: Number(payload.protein || 0),
      carbs: Number(payload.carbs || 0),
      fats: Number(payload.fats || 0),
      fiber: Number(payload.fiber || 0),
      water: Number(payload.water || 0)
    });
  },

  async remove(id) {
    removeUserData("nutrition", id);

    return {
      success: true
    };
  }
};