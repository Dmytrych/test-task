import { useState } from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type AddProjectFormProps = {
  onSubmit: (ownerLogin: string, repositoryName: string) => void;
};

const AddProjectForm = ({ onSubmit }: AddProjectFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string) => {
    const isValid = /^[^/]+\/[^/]+$/.test(value); // Regex to check "string/string" format
    setError(isValid ? "" : "Input must be in the format 'string/string'");
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput(inputValue)) {
      const values = inputValue.split("/");
      onSubmit(values[0], values[1]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="projectInput" className="block text-sm font-medium text-gray-700">
          Project Path
        </label>
        <Input
          id="projectInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => validateInput(inputValue)}
          className="mt-1 block w-full"
          placeholder="Enter value in format 'string/string'"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <Button
        type="submit"
      >
        Create
      </Button>
    </form>
  );
};

export default AddProjectForm;
