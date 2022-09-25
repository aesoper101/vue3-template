import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userModules from './user';
import type { MockMethod } from 'vite-plugin-mock';

const mockModules: MockMethod[] = [...userModules];

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
