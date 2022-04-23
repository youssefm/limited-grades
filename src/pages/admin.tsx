import { FC, useEffect, useState } from "react";

import SpinnerIcon from "assets/spinner.svg";
import Select from "components/common/Select";
import { fetchJson } from "lib/util";

const Admin: FC = () => {
  const [selectedAction, setSelectedAction] = useState<string>();
  const [actionOptions, setActionOptions] = useState<string[]>([]);
  const [actionOutput, setActionOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await fetchJson<string[]>("/api/admin");
      setActionOptions(fetchedOptions);
    };

    fetchOptions().catch((error) => console.log(error));
  }, []);

  return (
    <div className="overflow-y-auto p-12 h-full text-neutral-800 dark:text-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto w-[720px]">
        <div className="p-8 bg-neutral-100 dark:bg-neutral-800 rounded-t-lg">
          <h1 className="mb-8 text-3xl text-center">Run an Admin Action</h1>
          <form
            className="flex gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (selectedAction && !loading) {
                setLoading(true);
                const response = await fetch(`/api/admin/${selectedAction}`, {
                  method: "POST",
                });
                setActionOutput(
                  ((await response.json()) as { output: string[] }).output
                );
                setLoading(false);
              }
            }}
          >
            <Select
              value={selectedAction}
              options={actionOptions}
              onChange={setSelectedAction}
              getLabel={(action) => action}
              isClearable
              placeholder="Select an admin action..."
              autoFocus
              instanceId="admin-action-select"
              className="grow"
            />
            <button
              className="w-24 text-neutral-100 bg-blue-500 dark:bg-amber-600 rounded"
              type="submit"
            >
              {!loading && <span>Run</span>}
              {loading && (
                <SpinnerIcon
                  width="1em"
                  height="1em"
                  className="mx-auto animate-spin fill-neutral-900"
                />
              )}
            </button>
          </form>
        </div>
        {actionOutput.length > 0 && (
          <div className="p-4 font-mono">
            <div className="pb-2">Output:</div>
            <div className="text-sm whitespace-pre">
              {actionOutput.join("\n")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
