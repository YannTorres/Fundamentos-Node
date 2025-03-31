export function buildRoutePath(path) {
  // Pegar da rota tudo que começe com :
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // Ex: substituir a nossa o rota o /:id pelo id enviado do usuário: (7cddb688-008e-4e90-86e3-c5a54e10a542)
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') //$1 cria um grupo com nome id

  return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
}