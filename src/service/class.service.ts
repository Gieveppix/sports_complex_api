import { getCurrentTimestamp } from '$/src/helpers/timestamp.js';
import { Class } from '$/src/interface/types/class.type.js';
import * as classDao from '$/src/dao/class.dao.js';

type Response = {
  responseCode: number;
  message: string;
  data?: object; // TODO: dont forget to change
};

async function createClass(
  classes: Omit<Class, 'id' | 'created_at' | 'updated_at'>
): Promise<Response> {
  try {
    await classDao.createClassData(classes);
    return {
      responseCode: 200,
      message: `Class ${classes.name} created`,
    };
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.constraint === 'class_name_unique') {
      return {
        responseCode: 409,
        message: `Class by the name of ${classes.name} already exists`,
      };
    } else {
      return {
        responseCode: 500,
        message: 'Server error',
      };
    }
  }
}

async function getClasses(): Promise<Response> {
  const classes = await classDao.getAllClasses();
  return {
    responseCode: 200,
    message: 'Classes returned successfully',
    data: classes,
  };
}

async function getClassById(id: string): Promise<Response> {
  const classData = await classDao.getClassByIdData(id);

  if (!classData) {
    return {
      responseCode: 404,
      message: `Class with id:${id} not found`,
    };
  }

  const appointments = await classDao.getClassAppointments(id);
  const schedule = appointments.map((appointment) => ({
    starting_at: appointment.starting_at,
    age_category: appointment.age_category,
    duration: appointment.duration,
  }));

  return {
    responseCode: 200,
    message: `Class with id:${id}`,
    data: {
      ...classData,
      schedule,
    },
  };
}

async function updateClass(id: string, classData: Class): Promise<Response> {
  try {
    classData.updated_at = getCurrentTimestamp();
    const updatedRows = await classDao.updateClassData(id, classData);

    if (updatedRows === 0) {
      return {
        responseCode: 404,
        message: 'Class not found',
      };
    } else {
      return {
        responseCode: 200,
        message: 'Class updated succesfully',
      };
    }
  } catch (error) {
    return {
      responseCode: 500,
      message: 'Server error',
    };
  }
}

export { createClass, getClasses, getClassById, updateClass };
