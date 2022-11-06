import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useReplyCommentMutation } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import useToast from '../../hooks/useToast';
import getErrorMessages from '../../utils/getErrorMessages';
import CommentForm, { CommentFormFields } from './CommentForm';
import useCommentStore from '../../hooks/store/useCommentStore';

const ReplyCommentModal = () => {
  const replyCommentMutation = useReplyCommentMutation(graphqlClient);

  const {
    closeReplyCommentModal,
    setReplyContent,
    isReplyCommentModalOpen,
    parentCommentId,
    replyContent,
    replyComment,
  } = useCommentStore();

  const toast = useToast();

  console.log('reply comment modal: ', isReplyCommentModalOpen);

  const handlePostReply: SubmitHandler<CommentFormFields> = async ({
    content,
  }) => {
    try {
      await replyCommentMutation.mutateAsync({
        replyCommentInput: {
          parentId: '5000' || parentCommentId,
          content,
        },
      });

      replyComment(true);

      toast({}).fire({
        title: 'دیدگاه شما پس از تایید نمایش داده خواهد شد.',
        icon: 'success',
      });
    } catch (err) {
      replyComment(false);

      getErrorMessages(err).map((errorMessage) =>
        toast({}).fire({
          title: errorMessage,
          icon: 'error',
        })
      );
    }
  };

  return (
    <>
      <Transition appear show={isReplyCommentModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={closeReplyCommentModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white px-6 py-3 align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    <h2 className="font-bold text-xl stroke-4 stroke-white">
                      ارسال پاسخ
                    </h2>
                  </Dialog.Title>

                  <div className="mt-5">
                    <CommentForm
                      handleSubmit={handlePostReply}
                      defaultValue={replyContent}
                      onChange={(event) => setReplyContent(event.target.value)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReplyCommentModal;
