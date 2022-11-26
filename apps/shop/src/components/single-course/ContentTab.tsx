import React from 'react';
import { Tab } from '@headlessui/react';
import { ShadowBox, MarkDown } from '@zeenzen/common';

import Comments from './Comments';

interface ContentTabProps {
  title: string;
  content: string; // should be markdown(MD)
  courseId: string;
}

const ContentTab: React.FC<ContentTabProps> = ({
  title,
  content,
  courseId,
}) => {
  return (
    <Tab.Panel className="space-y-24">
      <ShadowBox
        title={title}
        titleSize="lg"
        className="py-[3rem] px-14 min-w-full prose prose-slate w-full"
      >
        <MarkDown markdown={content} />
      </ShadowBox>

      <Comments courseId={courseId} />
    </Tab.Panel>
  );
};

export default ContentTab;
