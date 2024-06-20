import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from '../components/Input'

import { useAuth } from '../provider/authProvider';
import { LoginService } from "../services/auth.service";



const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string()
})

export const LoginPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const handleLogin = async (payload) => {
    try {
      const { data } = await LoginService(payload);
      setToken(data.token);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error.message);
      alert("E-mail ou senha inválida");
    }
  };

  return (
    <main className='flex flex-col p-2 items-center min-h-dvh justify-center'>
      <h1 className='text-orange-400 text-2xl font-semibold mb-8'>Entre na sua conta</h1>

      <form onSubmit={handleSubmit(handleLogin)} className='grid gap-4 px-6 py-8 border rounded-lg w-full max-w-lg shadow-lg'>
        <Input errorMessage={errors.email?.message} label='Email:' placeholder='john@example.com' {...register("email")} />

        <Input errorMessage={errors.password?.message} label='Senha:' type='password' placeholder='******' {...register("password")} />

        <button type="submit" className='bg-orange-400 hover:bg-orange-500 transition-colors text-white p-3 rounded-md'>Entrar</button>
      </form>

      <p className='text-gray-700 mt-8 text-sm'>
        Ainda não possui uma conta?
        <Link to='/auth/register' className='pl-1 transition-colors text-orange-400 hover:text-orange-500'>Registre-se</Link>
      </p>
    </main>
  )
}
