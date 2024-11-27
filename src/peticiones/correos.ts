
const GET_CORREOS = process.env.NEXT_PUBLIC_GET_CORREOS
const POST_CREAR_CORREO = process.env.NEXT_PUBLIC_POST_CREAR_CORREO
const GET_CORREOS_FILTRADOS = process.env.NEXT_PUBLIC_GET_CORREO_FILTER

export const getCorreos = async (page: Number, pageSize: Number): Promise<any[]> => {
  try {
    const response = await fetch(`${GET_CORREOS}?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error('Error al obtener los correos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los correos:', error);
    return [];
  }
};

export const postCrearCorreo = async (data: any) => {
  try {
    const response = await fetch(`${POST_CREAR_CORREO}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Error al crear el correo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear el correo:', error);
    return null;
  }
}

export const getCorreosFiltrados = async (page: Number, pageSize: Number, filtro: string): Promise<any[]> => {
  try {
    const response = await fetch(`${GET_CORREOS_FILTRADOS}?page=${page}&pageSize=${pageSize}&content=${filtro}`);
    if (!response.ok) {
      throw new Error('Error al obtener los correos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los correos:', error);
    return [];
  }
}