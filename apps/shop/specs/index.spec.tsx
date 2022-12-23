import React from 'react';
import { render, screen } from '@testing-library/react';

import HomePage from '../pages';

describe('Home Page', () => {
  it('Should render correct text in intro section', () => {
    render(<HomePage courses={[]} />);

    const introHeading = screen.getByRole('heading', {
      level: 1,
      name: 'یادگیری هیچوقت اینقدر آسون نبوده!',
    });

    const introParagraph = screen.getByTestId('intro-paragraph');

    expect(introHeading).toBeInTheDocument();

    expect(introParagraph).toBeInTheDocument();
    expect(introParagraph).not.toBeEmptyDOMElement();
  });

  it('Should render correct illustration in intro section', () => {
    render(<HomePage courses={[]} />);

    const illustration = screen.getByRole('img', {
      name: 'intro-image-illustration',
    });

    expect(illustration).toBeInTheDocument();
  });

  it('Should render why us header', () => {
    render(<HomePage courses={[]} />);

    const whyUsHeader = screen.getByRole('heading', {
      name: 'چرا ما؟',
    });

    expect(whyUsHeader).toBeInTheDocument();
  });

  it('Should render courses header', () => {
    render(<HomePage courses={[]} />);

    const coursesHeader = screen.getByRole('heading', {
      name: 'دوره های آموزشی ما',
    });

    expect(coursesHeader).toBeInTheDocument();
  });

  it('Should render FAQ header', () => {
    render(<HomePage courses={[]} />);

    const faqHeader = screen.getByRole('heading', {
      name: 'سوالات متداول',
    });

    screen.debug();

    expect(faqHeader).toBeInTheDocument();
  });
});
