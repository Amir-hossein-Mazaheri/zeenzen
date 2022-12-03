import React, { MouseEventHandler } from 'react';
import type { Comment as TComment } from '@zeenzen/data';
import { UserRole } from '@zeenzen/data';

import Avatar from './Avatar';
import { getJalaliDate } from '../utils';
import Badge from './Badge';
import { userRoleTranslator } from '../utils';
import AppLink from './AppLink';

// as const to extract values for union type
const colors = [
  'border-light-blue',
  'border-teal-500',
  'border-emerald-500',
  'border-violet-600',
] as const;

interface CommentProps extends TComment {
  hasReply?: boolean;
  borderColor?: typeof colors[number];
  isAuthenticated: boolean;
  onReply: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export const Comment: React.FC<CommentProps> = ({
  id,
  isAuthenticated,
  author,
  createdAt,
  content,
  replies,
  borderColor,
  onReply,
  hasReply = true,
}) => {
  return (
    <div className="space-y-7">
      <div
        className={`rounded-xl border ${
          hasReply ? 'border-gray-300' : borderColor
        } px-8 py-5`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar image={author?.avatar?.fullPath} width={72} height={72} />

            <div>
              <h3 className="font-bold text-lg">{`${author?.firstname} ${author?.lastname}`}</h3>
              <p className="mt-px">
                <span>در تاریخ </span>
                <span>{getJalaliDate(createdAt).format('YYYY/MM/DD')}</span>
              </p>
            </div>
          </div>

          <Badge
            text={userRoleTranslator(author?.role || UserRole.Customer)}
            rounded={false}
            px="px-6"
          />
        </div>

        <div className="mt-4 px-2">
          <p className="leading-loose">{content}</p>
          {isAuthenticated && hasReply && (
            <div className="mt-3 flex justify-end">
              <AppLink text="پاسخ دادن" type="button" onClick={onReply} />
            </div>
          )}
        </div>
      </div>

      {replies && replies.length > 0 && (
        <div className="pr-12 space-y-5">
          {replies?.map((reply) => (
            <Comment
              key={reply.id}
              {...reply}
              onReply={onReply}
              isAuthenticated={isAuthenticated}
              hasReply={false}
              borderColor={colors[Number(reply.id) % colors.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
