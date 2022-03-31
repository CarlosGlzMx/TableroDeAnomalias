/*
Manejo de una variable de sesión que se pueda consultar desde todos
los demás archivos. Se debería de modificar con Login y Logout 
*/

var Session = (function() {
    var session = false;
    return {
      getSession: () => { return session },
      setSession: newSession => { session = newSession }
    }  
})();

export default Session;