const FormularioLogin = ({ 
    onUsuarioFocus, 
    onUsuarioBlur, 
    onUsuarioKeyUp,
    onClaveFocus,
    onClaveBlur,
    onSubmit,
    onRegistrarse 
}) => {
    return (
        <form className="formulario" onSubmit={onSubmit}>
            <label htmlFor="usuario">Usuario</label>
            <input
                id="usuario"
                type="text"
                placeholder="usuario@ejemplo.com"
                autoComplete="off"
                onFocus={onUsuarioFocus}
                onBlur={onUsuarioBlur}
                onKeyUp={onUsuarioKeyUp}
            />
            <label htmlFor="clave">Contraseña</label>
            <input
                id="clave"
                type="password"
                placeholder="*******"
                onFocus={onClaveFocus}
                onBlur={onClaveBlur}
            />
            <button type="submit">Login</button>
            <div className="registro-link">
                ¿No tienes cuenta? <a href="#" onClick={onRegistrarse}>Regístrate</a>
            </div>
        </form>
    );
};

export default FormularioLogin;

