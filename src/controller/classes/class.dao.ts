/* eslint-disable @typescript-eslint/no-explicit-any */ // TODO: fix any
import { db } from '$/src/database/db.js';
import { getCurrentTimestamp } from '$/src/helpers/timestamp.js';
import { Class } from '$/src/interface/types/class.type.js';

type Response = {
  responseCode: number;
  message: string;
};
let response: Response = {
  responseCode: 500,
  message: 'Server error',
};

export async function createClass(
  classes: Omit<Class, 'id' | 'created_at' | 'updated_at'>
): Promise<any> {
  return await db
    .table('class')
    .insert({
      name: classes.name,
      description: classes.description,
    })
    .then((data) => {
      response = {
        responseCode: 200,
        message: `Class ${classes.name} created`,
      };
      return response;
    })
    .catch((error) => {
      if (error.constraint === 'class_name_unique') {
        response = {
          responseCode: 409,
          message: `Class by the name of ${classes.name} already exists`,
        };
        return response;
      } else return response;
    });
}

export async function getClasses(): Promise<any> {
  return await db
    .table('class')
    .select('*')
    .then((classes) => {
      response = {
        responseCode: 200,
        message: 'Classes returned successfully',
      };
      return {
        data: classes,
        response,
      };
    });
}

export async function getClassById(id: string): Promise<any> {
  const classData = await db.table('class').select('*').where({ id }).first();

  if (!classData) {
    response = {
      responseCode: 404,
      message: `Class with id:${id} not found`,
    };
    return response;
  }

  const appointments = await db
    .table('class_appointment')
    .select('*')
    .where({ class_id: id });

  const schedule = appointments.map((appointment) => ({
    starting_at: appointment.starting_at,
    age_category: appointment.age_category,
    duration: appointment.duration,
  }));

  response = {
    responseCode: 200,
    message: `Class with id:${id}`,
  };

  return {
    data: {
      ...classData,
      schedule,
    },
    response,
  };
}

export async function updateClass(id: string, classData: Class): Promise<any> {
  try {
    classData.updated_at = getCurrentTimestamp();
    const updatedRows = await db
      .table('class')
      .select('*')
      .where({ id })
      .update(classData);

    if (updatedRows === 0) {
      response = {
        responseCode: 404,
        message: 'Class not found',
      };
      return response;
    } else {
      response = {
        responseCode: 200,
        message: 'Class updated succesfully',
      };
      return response;
    }
  } catch (error) {
    return response;
  }
}
