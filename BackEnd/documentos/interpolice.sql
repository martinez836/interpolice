-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2025 a las 06:16:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudadano`
--

CREATE TABLE `ciudadano` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellidos` varchar(200) DEFAULT NULL,
  `apodo` varchar(200) DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `planetaOrigen` varchar(200) NOT NULL,
  `planetaResidencia` varchar(200) NOT NULL,
  `foto` varchar(400) DEFAULT NULL,
  `codigoQR` text NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudadano`
--

INSERT INTO `ciudadano` (`codigo`, `nombre`, `apellidos`, `apodo`, `fechaNacimiento`, `planetaOrigen`, `planetaResidencia`, `foto`, `codigoQR`, `estado`) VALUES
(10, 'David', 'Muñoz Bedoya', 'Chiqui', '2025-06-03', 'Jupiter', 'Tierra', '', '/qrs/david_1752278526062.png', 1),
(11, 'Cristiano', 'Ronaldo', 'El Bicho', '1985-02-02', 'Tierra', 'saturno', '', '/qrs/cristiano_1752287140446.png', 1),
(12, 'juan', 'ruiz', 'Rey', '2025-06-04', 'Tierra', 'Tierra', '', '/qrs/juan_1750358006457.png', 2),
(13, 'afz', 'casd', 'fasd', '2025-06-06', 'fas', 'fasd', '', '/qrs/afz_1750358471761.png', 1),
(14, 'vdsa', 'dasf', 'd', '2025-06-03', 'afdsf', 'fad', '', '/qrs/vdsa_1750358579216.png', 1),
(15, 'duvan', 'vergara', 'el principe', '1985-02-02', 'Tierra', 'saturno', '', '/qrs/duvan_1752287119082.png', 1),
(16, 'Juan', 'Esteban', 'Juansito', '2007-03-06', 'Tierra', 'Tierra', '', '/qrs/juan_1752287604500.png', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `password` varchar(250) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `nombre`, `email`, `telefono`, `password`, `rol`, `estado`) VALUES
(2, 'Juan Esteban Martinez', 'juan2007@gmail.com', '', '12345', 'Policia', ''),
(3, 'Esteban Martinez Ramirez', 'Martinez@gmail.com', '', '$2b$11$Bo40LiadP0E1V', 'Policia', ''),
(4, 'Juan', 'Juansito@gmail.com', '', '$2b$11$g2MiSJBAjrKN6xq5pONYP.xLtyb3fJXLo7ghkHKWG6JcdGBCYbIDu', 'Policia', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
