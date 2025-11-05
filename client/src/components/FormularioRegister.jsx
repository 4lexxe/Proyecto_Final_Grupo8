const FormularioRegister = ({ 
    paso,
    formData,
    onNombresChange,
    onApellidosChange,
    onEdadChange,
    onEmailChange,
    onClaveChange,
    onConfirmClaveChange,
    onNivelInglesChange,
    onContinuarNivel,
    onContinuarNombres,
    onContinuarUsuario,
    onSubmit,
    onIniciarSesion,
    error,
    loading
}) => {
    // Paso 1: Nivel de inglés
    if (paso === 1) {
        return (
            <form className="formulario" onSubmit={onContinuarNivel}>
                {error && <div className="error-message">{error}</div>}
                
                <label htmlFor="nivelIngles">¿Cuánto inglés sabes?</label>
                <select
                    id="nivelIngles"
                    onChange={onNivelInglesChange}
                    defaultValue=""
                >
                    <option value="" disabled>Selecciona tu nivel</option>
                    <option value="principiante">Estoy empezando a aprender inglés</option>
                    <option value="basico">Conozco algunas palabras comunes</option>
                    <option value="intermedio">Puedo mantener conversaciones simples</option>
                    <option value="avanzado">Puedo conversar sobre varios temas</option>
                    <option value="experto">Puedo debatir en detalle sobre la mayoría de los temas</option>
                </select>

                <button type="submit">Continuar</button>
                <div className="registro-link">
                    ¿Ya tienes cuenta? <a href="#" onClick={onIniciarSesion}>Inicia sesión</a>
                </div>
            </form>
        );
    }

    // Paso 2: Nombres, Apellidos y Edad
    if (paso === 2) {
        return (
            <form className="formulario" onSubmit={onContinuarNombres}>
                {error && <div className="error-message">{error}</div>}
                
                <label htmlFor="nombres">Nombres</label>
                <input
                    id="nombres"
                    type="text"
                    placeholder="Tus nombres"
                    autoComplete="off"
                    onChange={onNombresChange}
                    disabled={loading}
                />

                <label htmlFor="apellidos">Apellidos</label>
                <input
                    id="apellidos"
                    type="text"
                    placeholder="Tus apellidos"
                    autoComplete="off"
                    onChange={onApellidosChange}
                    disabled={loading}
                />

                <label htmlFor="edad">Edad</label>
                <input
                    id="edad"
                    type="number"
                    placeholder="Tu edad"
                    min="1"
                    max="120"
                    autoComplete="off"
                    onChange={onEdadChange}
                    disabled={loading}
                />

                <label htmlFor="email">Correo Electronico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    autoComplete="off"
                    onChange={onEmailChange}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Continuar'}
                </button>
                <div className="registro-link">
                    ¿Ya tienes cuenta? <a href="#" onClick={onIniciarSesion}>Inicia sesión</a>
                </div>
            </form>
        );
    }

    // Paso 3: Usuario generado
    if (paso === 3) {
        return (
            <form className="formulario" onSubmit={onContinuarUsuario}>
                <label htmlFor="usuario">Tu usuario</label>
                <input
                    id="usuario"
                    type="text"
                    value={formData.username}
                    readOnly
                    className="input-readonly"
                />

                <button type="submit">Continuar</button>
                <div className="registro-link">
                    ¿Ya tienes cuenta? <a href="#" onClick={onIniciarSesion}>Inicia sesión</a>
                </div>
            </form>
        );
    }

    // Paso 4: Contraseña
    return (
        <form className="formulario" onSubmit={onSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <label htmlFor="clave">Contraseña</label>
            <input
                id="clave"
                type="password"
                placeholder="*******"
                onChange={onClaveChange}
            />

            <label htmlFor="confirmClave">Confirmar Contraseña</label>
            <input
                id="confirmClave"
                type="password"
                placeholder="*******"
                onChange={onConfirmClaveChange}
            />

            <button type="submit">Registrarse</button>
            <div className="registro-link">
                ¿Ya tienes cuenta? <a href="#" onClick={onIniciarSesion}>Inicia sesión</a>
            </div>
        </form>
    );
};

export default FormularioRegister;

