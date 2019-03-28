export const getListsByBoardId = (boards, boardID) => {
  const board = boards[boardID];
  const lists = board.lists;
  return lists;
};
