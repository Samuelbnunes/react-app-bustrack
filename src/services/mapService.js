import axios from 'axios';

const BASE_URL = 'https://passing-agatha-atitus-0ca94c8f.koyeb.app/ws/point';



export async function getPoints(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Mocked response
    /*
    const response = {
      status: 200,
      data: [
      {
        id: 1,
        descricao: 'Avenida Paulista',
        latitude: -23.561684,
        longitude: -46.656139,
      },
      {
        id: 2,
        descricao: 'Parque Ibirapuera',
        latitude: -23.587416,
        longitude: -46.657634,
      },
      {
        id: 3,
        descricao: 'Mercadão Municipal',
        latitude: -23.541212,
        longitude: -46.627684,
      },
      {
        id: 4,
        descricao: 'Estação da Luz',
        latitude: -23.536578,
        longitude: -46.633309,
      },
      ],
    };
    */

    // o objeto response.data possui os campos latitude e longitude mas precisamos mudar os nomes para lat lng
    const points = response.data.map(point => ({
      id: point.id,
      title: point.descricao,
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

export async function postPoint(token, pointData) {
  try {
    const response = await axios.post(BASE_URL, pointData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Mocked response
    /*
    const response = {
      status: 200,
      data: {
      id: Math.floor(Math.random() * 10000),
      ...pointData,
      },
    };
    */
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Erro ao cadastrar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');
  }
}