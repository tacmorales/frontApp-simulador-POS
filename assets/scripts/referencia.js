$(document).ready(function () {
	var colaboradores = [];

	function limpiarErrores() {
		$("#msg-rut, #msg-nombre, #msg-salario-bruto, #msg-departamento").html("");
	}

	function limpiarFormulario() {
		$("#txt-rut, #txt-nombre, #select-departamento, #txt-salario-bruto").val("");
	}

	function obtenerRetencion(salarioBruto) {
		var retencion = 0;
		if (salarioBruto > 1500) retencion = 5;
		if (salarioBruto > 3000) retencion = 8;
		return retencion;
	}

	function obtenerSalario(salarioBruto, retencion) {
		return salarioBruto - salarioBruto * (retencion / 100);
	}

	function colorDepartamento(departamento) {
		switch (departamento) {
			case "Tecnología":
				return "text-bg-primary";
				break;

			case "Talento Humano":
				return "text-bg-warning";
				break;

			case "Administración":
				return "text-bg-info";
				break;

			default:
				return "text-bg-dark";
				break;
		}
	}

	function colorRetencion(retencion) {
		var color = "";
		switch (retencion) {
			case 0:
				color = "bg-danger-subtle";
				break;

			case 5:
				color = "bg-warning-subtle";
				break;

			case 8:
				color = "bg-success-subtle";
				break;

			default:
				color = "bg-body-tertiary";
				break;
		}

		return color;
	}

	// Ejemplo ciclo FOR
	// function listarColaboradores(colaboradores) {
	//     $("#listado tbody").html("")
	//     for (let index = 0; index < colaboradores.length; index++) {
	//         var colorDep = colorDepartamento(colaboradores[index].departamento)
	//         var colorRet = colorRetencion(colaboradores[index].retencion)
	//         $("#listado tbody").append(`
	//             <tr>
	//                 <td>${colaboradores[index].rut}</td>
	//                 <td>${colaboradores[index].nombre}</td>
	//                 <td>
	//                     <span class="badge ${colorDep}">${colaboradores[index].departamento}</span>
	//                 </td>
	//                 <td class="text-end">${colaboradores[index].salario_bruto}</td>
	//                 <td class="${colorRet} text-center">${colaboradores[index].retencion}%</td>
	//                 <td class="text-end">${colaboradores[index].salario_neto}</td>
	//             </tr>
	//         `)
	//     }
	// }

	// Ejemplo ciclo While
	function listarColaboradores(colaboradores) {
		$("#listado tbody").html("");
		var index = 0;
		while (index < colaboradores.length) {
			var colorDep = colorDepartamento(colaboradores[index].departamento);
			var colorRet = colorRetencion(colaboradores[index].retencion);
			$("#listado tbody").append(`
                <tr>
                    <td>${colaboradores[index].rut}</td>
                    <td>${colaboradores[index].nombre}</td>
                    <td>
                        <span class="badge ${colorDep}">${colaboradores[index].departamento}</span>
                    </td>
                    <td class="text-end">${colaboradores[index].salario_bruto}</td>
                    <td class="${colorRet} text-center">${colaboradores[index].retencion}%</td>
                    <td class="text-end">${colaboradores[index].salario_neto}</td>
                </tr>    
            `);
			index++;
		}
	}

	$("#formulario").submit(function (evento) {
		evento.preventDefault();

		limpiarErrores();

		var rut = $("#txt-rut").val();
		var nombre = $("#txt-nombre").val();
		var salarioBruto = $("#txt-salario-bruto").val();
		var departamento = $("#select-departamento").val();

		if (rut == "") {
			return $("#msg-rut").html("Ingrese el RUT");
		}

		if (nombre == "") {
			return $("#msg-nombre").html("Ingrese el nombre");
		}

		if (salarioBruto == "") {
			return $("#msg-salario-bruto").html("Ingrese el salario bruto");
		}
		if (departamento == "") {
			return $("#msg-departamento").html("Seleccione el departamento");
		}

		var retencion = obtenerRetencion(salarioBruto);

		var colaborador = {
			rut: rut,
			nombre: nombre,
			salario_bruto: Number(salarioBruto),
			departamento: departamento,
			retencion: retencion,
			salario_neto: obtenerSalario(salarioBruto, retencion),
		};

		colaboradores.push(colaborador);
		limpiarFormulario();
		listarColaboradores(colaboradores);
	});
});
