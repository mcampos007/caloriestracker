import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = { dispatch: Dispatch<ActivityActions>; state: ActivityState };

const InitialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(InitialState);

  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(
        (setActivity) => setActivity.id === state.activeId
      )[0];
      setActivity(selectActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { category, name, calories } = activity;
    return category > 0 && name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...InitialState,
      id: uuidv4(), // Reset <form action="
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          name=""
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ejemplo: Comida, Jugo de Naranja, Ensalada, Pesas, Bicicleta, etc."
          name=""
          id="name"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Actividad:
        </label>
        <input
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Calorias. ej, 300 o 500"
          name=""
          id="calories"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-40 rounded-lg"
        name=""
        id=""
        value={activity.category === 1 ? "GuaRdar Comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
