import { postCrearUsuario } from "@/peticiones";
import { Overlay } from "..";

interface Props {
  onClose: () => void;
}

export const CreateUser = ({ onClose }: Props) => {

  const handleCrearUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const datosNuevoUsuario = {
      name: form.get("nombre") as string,
      email: form.get("correo") as string
    }
    console.log(datosNuevoUsuario);

    const data = await postCrearUsuario(datosNuevoUsuario);
    if (data) {
      onClose();
    }
  }

  return (
    <Overlay>
      <div
        className="bg-white flex flex-col rounded-[10px] shadow-2xl w-[457px] z-50 p-[20px]"
      >
        <div className="flex bg-transparent items-center justify-between pb-[20px]">
          <div className="flex items-center ">
            <span className="font-semibold text-xl mr-[10px]">Crear Usuario</span>
          </div>
        </div>
        <div className="w-full h-px bg-light_gray " />
        <form className="mt-[30px]" onSubmit={handleCrearUsuario} >
          <section className="flex flex-col w-full gap-[30px] mb-[30px]">
            <div className="flex flex-col">
              <span className="font-semibold text-sm mb-[5px]">Usuarios</span>
              <div className="flex items-center gap-[15px]">
                <div className="flex flex-col w-[47%] ">
                  <label htmlFor="nombre" className="text-sm mb-[5px] italic">Nombre</label>
                  <input type="text" name="nombre" className="bg-white text-black px-[10px] py-[5px] rounded-[5px] w-auto border border-gray focus:outline-none" required />  
                </div>
                <div className="flex flex-col w-[47%]">
                  <label htmlFor="correo" className="text-sm mb-[5px] italic">Correo electronico</label>
                  <input type="email" name="correo" className="bg-white text-black px-[10px] py-[5px] rounded-[5px] w-auto border border-gray focus:outline-none" required />
                </div>
              </div>
            </div>
          </section>
          <div className="w-full h-px bg-light_gray " />
          <section className="flex items-center justify-end pt-[20px] gap-[15px]">
            <button type="button" className=" btn-sin-fondo" onClick={onClose} >Cancelar</button>
            <button type="submit" className="btn-primary">Crear Usuario</button>
          </section>
        </form>
      </div>
    </Overlay>
  )
}