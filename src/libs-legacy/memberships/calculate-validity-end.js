const moment = require('moment')

export function calculateValidityEnd(validityStart, runtime, runtimeUnit, trialPeriod) {
    if (!['weeks', 'months'].includes(runtimeUnit)) {
        throw new Error(`unsupported runtime unit ${runtimeUnit}`)
    }
    if (trialPeriod && !['weeks', 'months'].includes(trialPeriod.unit)) {
        throw new Error(`unsupported runtime unit for trial period ${runtimeUnit}`)
    }

    const validityEnd = moment(validityStart).add(runtime, runtimeUnit)
    if (trialPeriod) {
        validityEnd.add(trialPeriod.runtime, trialPeriod.unit)
    }
    return validityEnd.toDate()
}
