$(document).ready(function()
{
    // No Permite Letras

    $('#superHero').on('keypress', function(e)
    {
        var soloDigitos = String.fromCharCode(e.which)

        if (!/[0-9]/.test(soloDigitos))
        {
            e.preventDefault();
        }
    });

    // No Permite Tres o Más Números

    $('#superHero').on('input', function()
    {
        if ($(this).val().length > 3)
        {
            $(this).val($(this).val().slice(0, 3));
        }
    });

    // Consulta de Héroe

    $('#heroForm').on('submit', function(e)
    {
        e.preventDefault();

        let superHero = $('#superHero').val();
        let regex = /[0-9]/;

        // Esto es Parte del Gráfico

        function explodePie(e)
        {
            if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === 'undefined' || !e.dataSeries.dataPoints[e.dataPointIndex].exploded)
            {
                e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
            }
            else
            {
                e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
            }

            e.chart.render();
        }

        $.ajax(
        {
            url: 'https://superheroapi.com/api.php/10226716420436711/' + superHero,
            method: 'GET',
            dataType: 'json',
            success: function(data)
            {
                if (regex.test(superHero))
                {
                    if (superHero >= 1 && superHero <= 732)
                    {
                        // Se Declaran las Variables

                        let imagen = data.image.url;
                        let nombre = data.name;

                        // Validaciones con Operadores Ternarios

                        let conexiones = data.connections['group-affiliation'] != '-' ? data.connections['group-affiliation'] : 'Sin información.';
                        let publicado = data.biography.publisher != '-' ? data.biography.publisher : 'Sin información.';
                        let ocupacion = data.work.occupation != '-' ? data.work.occupation : 'Sin información.';
                        let aparicion = data.biography['first-appearance'] != '-' ? data.biography['first-appearance'] : 'Sin información.';

                        // Validación de Altura

                        let altura;

                        if (data.appearance.height[0] != '-' && data.appearance.height[1] != '0 cm')
                        {
                            altura = data.appearance.height[0] + ' - ' + data.appearance.height[1];
                        }
                        else
                        {
                            altura = 'Sin información.'
                        }

                        // Validación de Peso

                        let peso;

                        if (data.appearance.weight[0] != '- lb' && data.appearance.weight[1] != '0 kg')
                        {
                            peso = data.appearance.weight[0] + ' - ' + data.appearance.weight[1];
                        }
                        else
                        {
                            peso = 'Sin información.'
                        }

                        // Validación de Alianzas

                        let alianzas = data.biography.aliases;

                        let alianzasArray = [];

                        if (data.biography.aliases != '-')
                        {
                            for (i = 0; i < alianzas.length; i++)
                            {
                                alianzasArray += alianzas[i] + ' ';
                            }
                        }
                        else
                        {
                            alianzasArray = 'Sin información.';
                        }

                        // Validación de Estadísticas

                        let estadisticasArray = [];

                        estadisticasArray = Object.values(data.powerstats);

                        for (i = 0; i < 7; i++)
                        {
                            if (data.powerstats[i] == null)
                            {
                                estadisticasArray[i] = 10;
                            }
                        }

                        // Bootstrap Card

                        $('#contenedorHero').html(`
                            <div class="col text-center">
                                <div class="card"">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <img src=" ${imagen} " alt="super-hero" style="width: 100%; height: 100%;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title text-left">Nombre: ${nombre} </h5>
                                                <p class="card-text text-justify" style="font-size: 11px;">Conexiones: ${conexiones} </p>
                                                <p class="card-text text-left" style="font-size: 12px; font-style: italic;">Publicado por: ${publicado} </p>
                                                <hr>
                                                <p class="card-text text-left" style="font-size: 12px; font-style: italic;">Ocupación: ${ocupacion} </p>
                                                <hr>
                                                <p class="card-text text-left" style="font-size: 12px; font-style: italic;">Primera Aparición: ${aparicion} </p>
                                                <hr>
                                                <p class="card-text text-left" style="font-size: 12px; font-style: italic;">Altura: ${altura} </p>
                                                <hr>
                                                <p class="card-text text-left" style="font-size: 12px; font-style: italic;">Peso: ${peso} </p>
                                                <hr>
                                                <p class="card-text text-left" style="font-size: 12px; font-style: italic;">Alianzas: ${alianzasArray} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        );

                        // CanvasJS

                        let config =
                        {
                            exportEnabled: true,
                            animationEnabled: true,
                            title:
                            {
                                text: 'Estadísticas de Poder para ' + nombre
                            },
                            legend:
                            {
                                cursor: 'pointer',
                                itemclick: explodePie
                            },
                            data:
                            [
                                {
                                    type: 'pie',
                                    showInLegend: true,
                                    toolTipContent: '{name}: <strong>{y}%</strong>',
                                    indexLabel: '{name} ({y})',
                                    dataPoints:
                                    [
                                        { y: estadisticasArray[0], name: 'Intelligence', exploded: true },
                                        { y: estadisticasArray[1], name: 'Strength' },
                                        { y: estadisticasArray[2], name: 'Speed' },
                                        { y: estadisticasArray[3], name: 'Durability' },
                                        { y: estadisticasArray[4], name: 'Power' },
                                        { y: estadisticasArray[5], name: 'Combat' }
                                    ]
                                }
                            ]
                        }

                        let chart = new CanvasJS.Chart('estadisticasHero', config);

                        chart.render();
                    }
                    else
                    {
                        // Si la Búsqueda Está Fuera de Rango

                        $('#mensajeAdvertencia').html('¡Número fuera de rango!');

                        $('#warningModal').modal('show');
                    }
                }
                else
                {
                    // Si Ingresa Números

                    $('#mensajeAdvertencia').html('¡Sólo ingrese números!');

                    $('#warningModal').modal('show');
                }
            },
            error: function()
            {
                // Para Dar con Esta Advertencia Modificar la URL

                $('#mensajeAdvertencia').html('¡Hubo un error crítico en la búsqueda!');

                $('#warningModal').modal('show');
            }
        });
    });
});
