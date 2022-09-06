const inputConverter = document.querySelector("#inputConverter")
const chooseSelect = document.querySelector("#chooseSelect")
const searchBtn = document.querySelector("#searchingButton")
const pConverter = document.querySelector("#pConverter")
let ourChart
async function getConverter(currency) {
    try {
        const endpoint = ("https://mindicador.cl/api/" + currency);
        const res = await fetch(endpoint);
        const converter = await res.json()
        return converter
    } catch (e) {
        const pConverter = document.querySelector("#pConverter")
        pConverter.innerHTML = "Failed to Fetch!"
    }
}


searchBtn.addEventListener("click", async () => {
    let inputConverter = document.querySelector("#inputConverter").value
    let chooseSelect = document.querySelector("#chooseSelect").value
    renderGrafica();
    let resultado = await getConverter(chooseSelect);
    let pConverter = document.querySelector("#pConverter")
    pConverter.innerHTML = "El Resultado es: " + (inputConverter / resultado.serie[0].valor)
})

function prepararConfiguracionParaLaGrafica(currency) {
   
    const tipoDeGrafica = "line";
    const nombresDeLasSeries = currency.serie.slice(0, 9);
    const titulo = "Gráfico de Valores de " + currency.nombre;
    const colorDeLinea = "red";
    let valorTexto = Array();
    let nameTexto = Array();
    nombresDeLasSeries.map((moneda) => {
        valorTexto.push(moneda.valor)
        nameTexto.push(moneda.fecha)
    })

    const config = {
        type: tipoDeGrafica,
        data: {
            labels: nameTexto,
            datasets: [
                {
                    label: titulo,
                    backgroundColor:
                        colorDeLinea,
                    data: valorTexto
                }
            ]
        }
    };
    return config
}

async function renderGrafica() {
    let chooseSelect = document.querySelector("#chooseSelect").value;
    const valores = await getConverter(chooseSelect);
    const config =
        prepararConfiguracionParaLaGrafica(valores);
    const chartDOM = document.getElementById("converterChart");
    if(ourChart){
        ourChart.destroy()
    }
    ourChart = new Chart(chartDOM, config);
}

