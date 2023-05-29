import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../../src/components/Header'

describe('Test Header', () => {
    test('Header contains correct text', () => {
        render(<Header />)
        expect(
            screen.getByText("Jake Barron's UI Adventure")
        ).toBeInTheDocument()
    })
})
