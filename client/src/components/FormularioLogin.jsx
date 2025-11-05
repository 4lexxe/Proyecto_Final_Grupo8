const FormularioLogin = ({ 
    onUsuarioFocus, 
    onUsuarioBlur, 
    onUsuarioKeyUp,
    onClaveFocus,
    onClaveBlur,
    onClaveChange,
    onSubmit,
    onRegistrarse,
    error,
    loading
}) => {
    return (
        <form className="formulario" onSubmit={onSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <label htmlFor="usuario">Usuario o Email</label>
            <input
                id="usuario"
                type="text"
                placeholder="usuario o correo@ejemplo.com"
                autoComplete="off"
                onFocus={onUsuarioFocus}
                onBlur={onUsuarioBlur}
                onKeyUp={onUsuarioKeyUp}
                disabled={loading}
            />
            <label htmlFor="clave">Contraseña</label>
            <input
                id="clave"
                type="password"
                placeholder="*******"
                onFocus={onClaveFocus}
                onBlur={onClaveBlur}
                onChange={onClaveChange}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Cargando...' : 'Ingresar'}
            </button>
            <div className="registro-link">
                ¿No tienes cuenta? <a href="#" onClick={onRegistrarse}>Regístrate</a>
            </div>
        </form>
    );
};

export default FormularioLogin;

