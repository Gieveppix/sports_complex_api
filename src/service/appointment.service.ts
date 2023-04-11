/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentTimestamp } from '$/src/helpers/timestamp.js';
import * as appointmentDao from '$/src/dao/appointment.dao.js';

type Response = {
  responseCode: number;
  message: string;
};

let response: Response = {
  responseCode: 500,
  message: 'Server error',
};

export async function createAppointmentService(appointment: any): Promise<any> {
  if (!(await appointmentDao.classExists(appointment.class_id))) {
    response = {
      responseCode: 404,
      message: 'Parent not found',
    };
    return response;
  } else {
    return appointmentDao
      .create(appointment)
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

export async function getAllAppointmentsService(filter?: {
  name?: string[];
  age?: string;
}): Promise<any> {
  const appointments = await appointmentDao.getAll(filter);

  response = {
    responseCode: 200,
    message: 'Appointments returned successfully',
  };

  return {
    data: appointments,
    response,
  };
}

export async function getAppointmentByIdService(id: number): Promise<any> {
  const data = await appointmentDao.getById(id);

  response = {
    responseCode: 200,
    message: `Appointment with id:${id}`,
  };

  return {
    data,
    response,
  };
}

export async function updateAppointmentService(
  id: number,
  appointmentData: any
): Promise<any> {
  if (
    !appointmentData.class_id ||
    (await appointmentDao.classExists(appointmentData.class_id))
  ) {
    try {
      appointmentData.updated_at = getCurrentTimestamp();
      const updatedRows = await appointmentDao.update(id, appointmentData);

      if (updatedRows === 0) {
        response = {
          responseCode: 404,
          message: 'Appointment not found',
        };

        return response;
      } else {
        response = {
          responseCode: 200,
          message: 'Appointment updated successfully',
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
  } else {
    response = {
      responseCode: 404,
      message: 'Parent not found',
    };
    return response;
  }
}

export async function deleteAppointmentService(id: number): Promise<any> {
  const deletedRows = await appointmentDao.deleteById(id);

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
