import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface UserFormProps<T> {
  data: T | null;
  setNewData: Dispatch<SetStateAction<T>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  action: string;
  fields: string[];
}

export function UserForm<T>({
  data,
  setNewData,
  handleSubmit,
  action,
  fields,
}: UserFormProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: name === "age" ? parseInt(value) : value,
      };
    });
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <input
            type="text"
            name={field}
            value={data[field]}
            onChange={handleChange}
          ></input>
        </label>
      ))}
      <button>{action} usuario</button>
    </form>
  );
}
