import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userModules from './user/user';
import loginModules from './user/login';
import type { MockMethod } from 'vite-plugin-mock';

const mockModules: MockMethod[] = [...userModules, ...loginModules];

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
