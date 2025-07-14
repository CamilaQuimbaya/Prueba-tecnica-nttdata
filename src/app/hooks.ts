//este archivo es para configurar hooks personalizados de Redux
//se exportan dos hooks: useAppDispatch y useAppSelector
//useAppDispatch es un hook tipado para usar el dispatch de Redux
//useAppSelector es un hook tipado para seleccionar el estado de Redux
//esto permite usar estos hooks en componentes de React sin tener que importar useDispatch y useSelector de Redux directamente
//se usa el tipo TypedUseSelectorHook para asegurar que useAppSelector tenga el tipo correcto
//se usa el tipo RootState para tipar el estado de la aplicación
//se usa el tipo AppDispatch para tipar el dispatch de la aplicación

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
