export const generateUniqueId = () => {
  // Genera un ID único combinando un timestamp con una parte aleatoria.
  // Esto es mucho más robusto que solo 6 caracteres aleatorios.
  // El toString(36) convierte el número a una cadena alfanumérica (base 36).
  const timestampPart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8); // Parte aleatoria de 6 caracteres

  // Combinamos ambas partes. El ID resultante será más largo que 6 caracteres,
  // pero garantiza una unicidad mucho mayor.
  return `${timestampPart}-${randomPart}`;
};