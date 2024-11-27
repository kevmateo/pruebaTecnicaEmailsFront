
const GET_USERS = process.env.NEXT_PUBLIC_GET_USER
const POST_CREATE_USER = process.env.NEXT_PUBLIC_POST_CREATE_USER

export const getUsers = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${GET_USERS}`);
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
};

export const postCrearUsuario = async (data: any): Promise<any> => {
  try {
    const response = await fetch(`${POST_CREATE_USER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return null;
  }
}