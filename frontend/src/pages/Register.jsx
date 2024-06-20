import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from '../components/Input'

import { registerService } from "../services/auth.service";


const schema = z.object({
  name: z.string().min(1, 'Insira o nome'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres')
})

export const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const handleRegister = async (payload) => {
    try {
      const response = await registerService(payload);
      if (response.status == 201) {
        alert("Usuário criado com sucesso! Entre com seus dados.")
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      console.error(error.message);
      alert("Erro ao salvar usuário. Tente novamente mais tarde");
    }
  };

  return (
    <main className='flex flex-col p-2 items-center min-h-dvh justify-center'>
      <h1 className='text-orange-400 text-2xl font-semibold mb-8'>Crie uma conta</h1>

      <form onSubmit={handleSubmit(handleRegister)} className='grid gap-4 px-6 py-8 border rounded-lg w-full max-w-lg shadow-lg'>
        <Input errorMessage={errors.name?.message} type="text" label='Nome:' placeholder='John Doe' {...register("name")} />

        <Input errorMessage={errors.email?.message} type="email" label='Email:' placeholder='john@example.com' {...register("email")} />

        <Input errorMessage={errors.password?.message} type="password" label='Senha:' placeholder='******' {...register("password")} />

        <button type="submit" className='bg-orange-400 hover:bg-orange-500 transition-colors text-white p-3 rounded-md'>Registrar</button>
      </form>

      <p className='text-gray-700 mt-8 text-sm'>
        Já possui uma conta?
        <Link to='/auth/login' className='pl-1 transition-colors text-orange-400 hover:text-orange-500'>Entre</Link>
      </p>
    </main>
  )
}
