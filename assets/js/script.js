$(document).ready(function()
{
    $('#hero').on('submit', function(e)
    {
        e.preventDefault();

        let valueInput = $('#superHero').val();

        $.ajax(
        {
            url: 'https://superheroapi.com/api.php/10226716420436711/' + valueInput,
            success: function(data)
            {
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections['group-affiliation'];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let aparicion = data.biography['first-appearance'];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases;

                let alianzasArray = [];

                for (i = 0; i < alianzas.length; i++)
                {
                    alianzasArray += alianzas[i] + ' '
                }

                let estadisticasArray = Object.values(data.powerstats);

                $('#contenedorHero').html('\n' +
                    '<div class="col text-center">\n' +
                        '<div class="card"">\n' +
                            '<div class="row no-gutters">\n' +
                                '<div class="col-md-4">\n' +
                                    '<img src="' + imagen + '" alt="super-hero" style="width: 100%; height: 100%;">\n' +
                                '</div>\n' +
                                '<div class="col-md-8">\n' +
                                    '<div class="card-body">\n' +
                                        '<h5 class="card-title text-left">Nombre: ' + nombre + '</h5>\n' +
                                        '<p class="card-text text-justify" style="font-size: 11px;">Conexiones: ' + conexiones + '</p>\n' +
                                        '<p class="card-text text-left" style="font-size: 12px; font-style: italic;">Publicado por: ' + publicado + '</p>\n' +
                                        '<hr>\n' +
                                        '<p class="card-text text-left" style="font-size: 12px; font-style: italic;">Ocupación: ' + ocupacion + '</p>\n' +
                                        '<hr>\n' +
                                        '<p class="card-text text-left" style="font-size: 12px; font-style: italic;">Primera Aparición: ' + aparicion + '</p>\n' +
                                        '<hr>\n' +
                                        '<p class="card-text text-left" style="font-size: 12px; font-style: italic;">Altura: ' + altura + '</p>\n' +
                                        '<hr>\n' +
                                        '<p class="card-text text-left" style="font-size: 12px; font-style: italic;">Peso: ' + peso + '</p>\n' +
                                        '<hr>\n' +
                                        '<p class="card-text text-left" style="font-size: 12px; font-style: italic;">Alianzas: ' + alianzasArray + '</p>\n' +
                                    '</div>\n' +
                                '</div>\n' +
                            '</div>\n' +
                        '</div>\n' +
                    '</div>'
                );

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
                        // itemclick: explodePie
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
        });
    });
});
