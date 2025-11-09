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
    onMotivacionesChange,
    onHorasChange,
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

                <label htmlFor="motivaciones">¿Por qué quieres aprender inglés?</label>
                <select
                    id="motivaciones"
                    onChange={onMotivacionesChange}
                    defaultValue=""
                >
                    <option value="" disabled>Selecciona una motivación</option>
                    <option value="trabajo">Mejorar oportunidades laborales</option>
                    <option value="viajar">Viajar y comunicarme en el extranjero</option>
                    <option value="estudios">Estudiar en el extranjero</option>
                    <option value="interes">Interés personal / hobby</option>
                    <option value="otros">Otras razones</option>
                </select>

                <label htmlFor="horasSemanales">¿Cuántas horas por semana dedicarías?</label>
                <select
                    id="horasSemanales"
                    onChange={onHorasChange}
                    defaultValue=""
                >
                    <option value="" disabled>Selecciona un rango</option>
                    <option value="1-2">1-2 horas</option>
                    <option value="3-5">3-5 horas</option>
                    <option value="6-9">6-9 horas</option>
                    <option value="10+">10 horas o más</option>
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

