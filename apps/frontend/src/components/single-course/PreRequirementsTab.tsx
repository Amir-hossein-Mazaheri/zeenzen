import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import graphqlClient from "../../api/graphql-client";
import Conditional from "../../common/Conditional";
import FalseCondition from "../../common/FalseCondition";
import Loadable from "../../common/Loadable";
import ShadowBox from "../../common/ShadowBox";
import TrueCondition from "../../common/TrueCondition";
import { usePreRequirementsQuery } from "../../generated/queries";
import PreRequirement from "./PreRequirement";

interface PreRequirementsTabProps {
  title: string;
  courseId: string;
  description?: string;
}

const PreRequirementsTab: React.FC<PreRequirementsTabProps> = ({
  title,
  courseId,
  description,
}) => {
  const { data, isLoading, error } = usePreRequirementsQuery(graphqlClient, {
    courseId,
  });

  return (
    <Tab.Panel as={Fragment}>
      <ShadowBox
        title={title}
        titleSize="lg"
        className="px-14 pb-8 pt-3 space-y-12"
      >
        <Loadable fragment isLoading={isLoading}>
          <Conditional invert condition={data?.preRequirements.length === 0}>
            <TrueCondition>
              {data?.preRequirements.map((preRequirement) => (
                <PreRequirement key={preRequirement.id} {...preRequirement} />
              ))}

              {description && (
                <p className="text-text-black leading-loose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description}
                  </ReactMarkdown>
                </p>
              )}
            </TrueCondition>
            <FalseCondition>
              <p className="text-center text-text-black font-bold text-xl">
                پیش نیازی برای این دوره وجود ندارد
              </p>
            </FalseCondition>
          </Conditional>
        </Loadable>
      </ShadowBox>
    </Tab.Panel>
  );
};

export default PreRequirementsTab;
