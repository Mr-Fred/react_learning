import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import CreateReviewForm from './CreateReviewForm';
import { CREATE_REVIEW } from '../graphQl/mutations';

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const { ownerName, repositoryName, rating, review } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text: review,
          },
        },
      });
      const repositoryId = data?.createReview?.repositoryId;
      if (repositoryId) {
        navigate(`/repository/${repositoryId}`);
      }
    } catch (e) {
      setErrors({ submit: e.message });
    } finally {
      setSubmitting(false);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
