import { useState, useEffect } from 'react';
import { useRecommendedMembersApi } from './useRecommendedMembers';
import { recommendedMemberRepository } from './../repositories/recommendedMemberRepository';
import { useMutation, useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { set } from 'react-hook-form';

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    // 始点
    const begin = (currentPage - 1) * itemsPerPage;
    // 終点
    const end = begin + itemsPerPage;
    // 切り取り

    return data.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export const useRecommendedMemberPagination = (page, searchWord) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [recommendedMembers, setRecommendedMembers] = useState([true]);
  const { getAccessTokenSilently } = useAuth0();

  const fetchData = async (page, searchWord = null) => {
    const accessToken = await getAccessTokenSilently();
    const response = await recommendedMemberRepository.getRecommendedMember(
      accessToken,
      page,
      searchWord
    );
    setTotalCount(response.data_count);
    setRecommendedMembers(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(page, searchWord);
  }, [page, searchWord]);

  return { recommendedMembers, isLoading, totalCount };
};
