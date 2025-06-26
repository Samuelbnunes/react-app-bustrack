import axios from 'axios';

const BASE_URL = "https://api-java-springboot-b0g2.onrender.com/ws/point";

// GET - Buscar todos os pontos
export async function getPoints(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Ajuste: converte os campos para o formato usado no frontend
    const points = response.data.map(point => ({
      id: point.id,
      title: point.description, // description conforme API
      position: {
        lat: point.latitude,
        lng: point.longitude,
      },
    }));

    if (response.status === 200) {
      return points;
    } else {
      throw new Error('Erro ao buscar pontos');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar pontos');
  }
}

// POST - Cadastrar novo ponto
export async function postPoint(token, pointData) {
  try {
    const data = {
      description: pointData.description,
      latitude: pointData.latitude,
      longitude: pointData.longitude,
    };

    const response = await axios.post(BASE_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      throw new Error('Erro ao cadastrar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');
  }
}

// PUT - Atualizar ponto existente
export async function putPoint(token, id, pointData) {
  try {
    const data = {
      description: pointData.description,
      latitude: pointData.latitude,
      longitude: pointData.longitude,
    };

    const url = `${BASE_URL}/${id}`;

    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Erro ao atualizar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar ponto');
  }
}

// DELETE - Remover ponto existente
export async function deletePoint(token, id) {
  try {
    const url = `${BASE_URL}/${id}`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      throw new Error('Erro ao excluir ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir ponto');
  }
}