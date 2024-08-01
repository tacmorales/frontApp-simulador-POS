$(document).ready(function () {
	var products = [];
	var errorProductName = false;
	var errorQty = false;
	var errorPrice = false;

	function cleanErrorQuantity() {
		$("#label-quantity").html("Cantidad del producto");
		$("#label-quantity").removeClass("text-danger");
		$("#form-quantity").removeClass("is-invalid");
		errorQty = false;
	}

	function cleanErrorPrice() {
		$("#label-price").html("Precio en pesos chilenos");
		$("#label-price").removeClass("text-danger");
		$("#form-price").removeClass("is-invalid");
		errorPrice = false;
	}

	function cleanErrorProductName() {
		$("#message-productName").addClass("d-none");
		$("#form-productName").removeClass("is-invalid");
		errorProductName = false;
	}

	function cleanErrors() {
		cleanErrorQuantity();
		cleanErrorPrice();
		cleanErrorProductName();
	}

	function cleanForm() {
		$("#form-price, #form-quantity").val("");
		$("#form-productName").val("Seleccione un producto");
	}

	function getSubTotal(quantity, price) {
		return quantity * price;
	}

	function sumTotal(products) {
		var total = 0;
		for (var i = 0; i < products.length; i++) {
			total += products[i].subTotal;
		}
		return total;
	}

	function insertProductsInTable(products) {
		$("#product-table tbody").html("");
		for (var i = 0; i < products.length; i++) {
			var productName = products[i].productName;
			var price = products[i].price;
			var quantity = products[i].quantity;
			var subTotal = products[i].subTotal;
			$("#product-table tbody").append(`
        <tr>
					<td>${productName}</td>
          <td>$${price}</td>
          <td>${quantity} uni.</td>
          <td>$${subTotal}</td>
        </tr>`);
		}
	}

	$("#formulario").on("submit", function (evento) {
		evento.preventDefault();

		cleanErrors();

		var productName = $("#form-productName").val();
		var price = Number($("#form-price").val());
		var quantity = Number($("#form-quantity").val());
		var subTotal = getSubTotal(quantity, price);

		var productNameIsValid = false;
		var priceIsValid = false;
		var quantityIsValid = false;
		if (productName === "" || productName === "Seleccione un producto" || !(typeof productName === "string")) {
			$("#message-productName").removeClass("d-none");
			$("#form-productName").addClass("is-invalid");
			errorProductName = true;
		} else {
			productNameIsValid = true;
		}

		if (price === "" || !(typeof price === "number") || !(price > 0)) {
			$("#label-price").html("Precio invalido.");
			$("#label-price").addClass("text-danger");
			$("#form-price").addClass("is-invalid");

			errorPrice = false;
		} else {
			priceIsValid = true;
		}

		if (quantity === "" || !(typeof quantity === "number") || !(quantity > 0)) {
			$("#label-quantity").html("Cantidad invalida.");
			$("#label-quantity").addClass("text-danger");
			$("#form-quantity").addClass("is-invalid");

			errorQty = true;
		} else {
			quantityIsValid = true;
		}

		var dataIsvalid = productNameIsValid && priceIsValid && quantityIsValid;
		console.log("productNameIsValid: " + productNameIsValid);
		console.log("priceIsValid: " + priceIsValid);
		console.log("quantityIsValid: " + quantityIsValid);

		if (!dataIsvalid) {
			return console.log("Dato(s) ingresado(s) invalido(s)");
		}

		var product = {
			productName: productName,
			price: price,
			quantity: quantity,
			subTotal: subTotal,
		};
		console.log(product);
		products.push(product);
		console.log(products);
		cleanForm();
		insertProductsInTable(products);
		$("#total-price").html(`\$${sumTotal(products)}`);
		return;
	});

	$("#form-quantity, #form-price, #form-productName").on("input", function (evento) {
		var id = $(this).attr("id");
		console.log(id);
		switch (id) {
			case "formulario":
				alert("chao");
				break;
			case "form-price":
				cleanErrorPrice();
				break;
			case "form-quantity":
				cleanErrorQuantity();
				break;
			case "form-productName":
				cleanErrorProductName();
				break;
			default:
				break;
		}
	});
});
