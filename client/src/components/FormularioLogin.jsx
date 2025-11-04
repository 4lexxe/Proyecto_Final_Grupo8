const FormularioLogin = ({ 
    onUsuarioFocus, 
    onUsuarioBlur, 
    onUsuarioKeyUp,
    onClaveFocus,
    onClaveBlur,
    onClaveChange,
    onSubmit,
    onRegistrarse,
    error 
}) => {
    return (
        <form className="formulario" onSubmit={onSubmit}>
            {error && <div className="error-message">{error}</div>}
            
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
                onChange={onClaveChange}
            />
            <button type="submit">Login</button>
            <div className="registro-link">
                ¿No tienes cuenta? <a href="#" onClick={onRegistrarse}>Regístrate</a>
            </div>
        </form>
    );
};

export default FormularioLogin;

