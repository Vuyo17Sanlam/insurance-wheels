const API_BASE = "https://688a63d94c55d5c739561b31.mockapi.io/vehicles";

export const getVehicles = async () => {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
};

export const getVehicleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/?id=${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch vehicle ${id}:`, error);
    return null;
  }
};


export async function updateVehicle(id, vehicleData) {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update vehicle with ID ${id}`);
    }

    const updatedVehicle = await response.json();
    return updatedVehicle;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
}


export const deleteVehicle = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete vehicle');
  }

  return true;
};

export async function addVehicle(vehicle) {
  const res = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicle),
  });

  if (!res.ok) {
    throw new Error('Failed to add vehicle');
  }

  return await res.json();
}
