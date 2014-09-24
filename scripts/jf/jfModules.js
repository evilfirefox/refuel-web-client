/**
 * Created by devastator on 7/3/14.
 */

var jfModules = {
    report: {
        entity: 'refuels',
        listAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + 'refuels', // todo: find a way to access jfModules.report.entity here
            template: 'row-report'
        },
        partialTemplates: {
            car: 'cell-car',
            fuel: 'cell-fuel',
            station: 'cell-station'
        }
    },
    refuel: {
        carAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + 'cars',
            template: 'list-car'
        },
        stationAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + 'refuel/stations',
            template: 'list-station'
        },
        stationAddAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + '/refuels/stations'
        },
        fuelAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + 'fuels',
            template: 'list-fuel'
        },
        fuelAddAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + '/fuels'
        },
        mainAction: {
            url: jfConfig.routing.serviceUrl + jfConfig.routing.servicePath + 'refuels'
        }
    }
}
