import { BenbenWithCompiledContent } from "@/type";

export const Benben = ({ benben }: { benben: BenbenWithCompiledContent }) => {

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: benben.compiledContent }}></div>
    </div>
  );
};
