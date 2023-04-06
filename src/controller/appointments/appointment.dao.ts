/* eslint-disable @typescript-eslint/no-explicit-any */ // TODO: fix any
import { db } from '$/src/database/db.js';
import { Appointment } from '$/src/interface/types/appointment.type.js';
import { getCurrentTimestamp } from '$/src/helpers/timestamp.js';

type Response = {
  responseCode: number;
  message: string;
};
let response: Response = {
  responseCode: 500,
  message: 'Server error',
};

export async function createAppointment(
  appointment: Omit<
    Appointment,
    'id' | 'enrollment_count' | 'created_at' | 'updated_at' | 'is_deleted'
  >
): Promise<any> {
  const class_exists = await db // TODO: You will use this a lot, move it out
    .table('class')
    .select('*')
    .where({ id: appointment.class_id });
  if (class_exists.length === 0) {
    response = {
      responseCode: 404,
      message: 'Parent not found',
    };
    return response;
  } else {
    return await db
      .table('class_appointment')
      .where({ class_id: appointment.class_id })
      .insert({
        class_id: appointment.class_id,
        starting_at: appointment.starting_at,
        age_category: appointment.age_category,
        duration: appointment.duration,
      })
      .then((data) => {
        response = {
          responseCode: 200,
          message: `Appointment created`,
        };
        return {
          data,
          response,
        };
      })
      .catch((error) => {
        if (error.severity === 'ERROR') {
          response = {
            responseCode: 422,
            message: 'Invalid body',
          };
          return response;
        } else {
          return response;
        }
      });
  }
}

export async function getAllAppointments(filter?: {
  name?: string[];
  age?: string;
}): Promise<any> {
  let query = db.table('class_appointment').select('*');

  if (filter) {
    if (filter.name) {
      query = query
        .join('class', 'class.id', 'class_appointment.class_id')
        .whereIn('class.name', filter.name);
    }

    if (filter.age) {
      query = query.where({ age_category: filter.age });
    }
  }

  return await query.then((appointments) => {
    response = {
      responseCode: 200,
      message: 'Appointments returned successfully',
    };
    return {
      data: appointments,
      response,
    };
  });
}

export async function getAppointmentById(id: string): Promise<any> {
  return await db
    .table('class_appointment')
    .select('*')
    .where({ id })
    .then((data) => {
      response = {
        responseCode: 200,
        message: `Appointment with id:${id}`,
      };
      return {
        data,
        response,
      };
    });
}

export async function updateAppointment(
  id: string,
  appointmentData: Omit<
    Appointment,
    'enrollment_count' | 'created_at' | 'is_deleted'
  >
): Promise<any> {
  if (!appointmentData.class_id) {
    const class_exists = await db
      .table('class')
      .select('*')
      .where({ id: appointmentData.class_id });
    if (class_exists.length === 0) {
      response = {
        responseCode: 404,
        message: 'Parent not found',
      };
      return response;
    }
  } else {
    try {
      appointmentData.updated_at = getCurrentTimestamp();
      const updatedRows = await db
        .table('class_appointment')
        .select('*')
        .where({ id })
        .update(appointmentData);

      if (updatedRows === 0) {
        response = {
          responseCode: 404,
          message: 'Appointment not found',
        };

        return response;
      } else {
        response = {
          responseCode: 200,
          message: 'Appointment updated succesfully',
        };
        return response;
      }
    } catch (error) {
      response = {
        responseCode: 400,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: `${error.detail}`,
      };

      return response;
    }
  }
}

// TODO: You have to implement check for the is_deleted flag
// TODO: Delete users that have a appointment registered here
export async function deleteAppointment(id: string): Promise<any> {
  const deletedRows = await db
    .table('class_appointment')
    .where({ id })
    .update({ is_deleted: true });

  if (deletedRows === 0) {
    response = {
      responseCode: 400,
      message: 'Error while deleting',
    };
    return response;
  } else {
    response = {
      responseCode: 200,
      message: `Appointment with id:${id} deleted`,
    };
    return response;
  }
}
