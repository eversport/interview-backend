const moment = require('moment')
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    }
  });

/**
 * Assign a membership to a customer
 * 
 * Tasks:
 *  - Refactor this function by thinking about seperations of concerns. Use the libs/legacy folder so split the controller code
 *  - Improve the code quality of this function by apply coding best practices
 * 
 */
export function assignMembershipToCustomerAction (params) {
    // default runtime of a membership is 1 month
    if (!params.runtimeUnit) params.runtimeUnit = 'months'
    if (!params.runtime) params.runtime = 1
    if (!params.pricePerUnit) params.pricePerUnit = 200

    // validate requried fields
    if (!params.customerId) {
        return { success: false, msg: 'missing_parameter_customerid' }        
    }
    if (!params.validityStart) {
        return { success: false, msg: 'missing_parameter_validity_start' }        
    }

    // if the customer already has a membership, do not assign a new one
    const existingMembership = await knex
        .select('id')
        .from('membership')
        .where('customer', params.customerId)
    
    if (existingMembership) {
        return { success: false, msg: 'customer_already_has_a_membership' }
    }

    // calculate the end of the validity of the membership
    const validityEnd = moment(params.validityStart).add(params.runtime, params.runtimeUnit)

    // calculate the total price of the membership
    let totalPrice = Math.round(params.pricePerUnit * 100) * params.runtime
    if (params.discount) {
        totalPrice = totalPrice - discount
    }

    // presist the membership 
    const membership = await knex
        .insert({
            customer: params.customerId,
            validityStart: params.validityStart,
            validityEnd: validityEnd,
            runtime: params.runtime,
            runtimeUnit: params.runtimeUnit,
            totalPrice: totalPrice
        })
        .into('membership')

    // map internal membership to public representation
    const publicMembership = {
        uuid: membership.id,
        validity: {
            from: membership.validityStart,
            until: membership.validityEnd
        },
        totalPrice: membership.totalPrice / 100 
    }
    return publicMembership
}

/**
 * Refactored Controller Action
 */
export function assignMembershipToCustomerRefactoredAction (params) {}